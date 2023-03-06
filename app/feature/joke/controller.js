const { Op, QueryTypes } = require("sequelize");
const { jokes: Joke, joke_votes: JokeVote, sequelize } = require("../../model/jokes_db");
class JokeController {
  async create(req, res, next) {
    try {
      const { body } = req;
      const joke = await Joke.create({
        content: body.content,
        created_by: body.created_by || "Anonymous",
      });
      return res.ok(joke);
    } catch (err) {
      console.error("create joke failed:", err);
      next(err);
    }
  }
  async getOne(req, res, next) {
    try {
      const readAll = req.session.readAll || false;
      // false safe when this user read all jokes
      if (readAll) {
        return res.ok({
          readAll: true,
          message: "That's all the jokes for today! Come back another day!",
          joke: null,
        });
      }
      const jokesRead = req.session.jokesRead || [];
      const joke = await Joke.findOne({
        where: {
          id: {
            [Op.notIn]: jokesRead,
          },
        },
      });
      // if not found then this user read all jokes
      if (!joke) {
        req.session.readAll = true;
        return res.ok({
          readAll: true,
          message: "That's all the jokes for today! Come back another day!",
          joke: null,
        });
      }

      // push this joke to read jokes
      jokesRead.push(joke.id);
      req.session.jokesRead = jokesRead;
      req.session.save();
      return res.ok({
        readAll: false,
        message: "",
        joke,
      });
    } catch (err) {
      console.error("get one failed:", err);
      next(err);
    }
  }

  async voteJoke(req, res, next) {
    try {
      const { id } = req.params;
      const voted = await JokeVote.findOne({
        where: {
          jokes_id: id,
          session: req.sessionID,
        },
      });
      if (voted) {
        return res.badRequest(null, "USER_ALREADY_VOTED");
      }
      await JokeVote.create({
        jokes_id: id,
        session: req.sessionID,
        vote: req.body.vote,
      });
      return res.ok(true);
    } catch (err) {
      console.error("vote joke failed:", err);
      next(err);
    }
  }

  async getRating(req, res, next) {
    try {
      const sql = `
      SELECT count(*) filter (where jv.vote = true) as likes,
      count(*) filter (where jv.vote = false) as dislikes
      FROM joke_votes jv
      WHERE jv.jokes_id = :id
      GROUP BY jv.jokes_id
      `;
      const result = await sequelize.query(sql, {
        replacements: {
          id: req.params.id,
        },
        type: QueryTypes.SELECT,
      });

      return res.ok({
        likes: Number(result[0]?.likes) || 0,
        dislikes: Number(result[0]?.dislikes) || 0,
      });
    } catch (err) {
      console.error("get joke rating failed:", err);
      next(err);
    }
  }
}

module.exports = new JokeController();
