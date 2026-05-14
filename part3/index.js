import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
const MAX_ENTRIES = 1000000;
app.use(express.static("frontend-build"));
app.use(express.json());
app.use(cors());

morgan.token("body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan("tiny", {
    skip: function (req, res) {
      return req.method === "POST";
    },
  }),
);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: function (req, res) {
        return req.method !== "POST";
      },
    },
  ),
);

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.send(phonebook);
});

app.get("/info", (req, res) => {
  const p = `
  Phonebook has info for ${phonebook.length} people
  ${new Date().toString()}
  `;
  res.send(p);
});

app.get("/api/persons/:id", (req, res) => {
  console.log(req.params.id);
  console.log(typeof req.params.id);
  const match = phonebook.find((entry) => entry.id === req.params.id);
  if (!match) {
    return res.status(404).end();
  }
  res.send(match);
});

app.delete("/api/persons/:id", (req, res) => {
  phonebook = phonebook.filter((entry) => entry.id !== req.params.id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }
  if (phonebook.find((entry) => entry.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newEntry = {
    id: String(getRandomInt(0, MAX_ENTRIES)),
    name: body.name,
    number: body.number,
  };
  phonebook = phonebook.concat(newEntry);
  res.status(201).json(newEntry).end();
});

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
