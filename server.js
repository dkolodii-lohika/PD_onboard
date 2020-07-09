const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");
const config = require("./config");
const log = [];

const messagesParser = (messages = []) => {
  messages.every((item) => {
    log.push(item);
    if (item.event === "incident.trigger") {
      const {
        incident: {
          title = "not parsed Title",
          html_url = "not parsed URL",
          description = "without description",
          created_at = "not parsed date",
          service: { summary = "not parsed name!" } = {},
        } = {},
      } = item;
      api.createIncedent({
        incident: {
          title: `incident on ${summary} with title: ${title}`,
          description: `at ${created_at} on service ${summary} created incedent with title: "${title}" and description: ${description} link to incedent: ${html_url}`,
          service: {
            id: config.childServiceID,
            type: "service",
          },
        },
      });
    }
  });
};

const app = express();
app.use(bodyParser.json());
app.get("/log", (req, res) => res.send(log));
app.post("/test", (req, res) => {
  if (req.body && req.body.messages) {
    messagesParser(req.body.messages);
  }
  res.send("ok");
});

app.listen(config.port, () => console.log(`app up`));
