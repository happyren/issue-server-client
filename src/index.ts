import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { Issue } from "./types/issue";

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000", // allow frontend to access backend
}));
app.use(express.json());

const todo: Record<string, any[]> = {};

const issues: Issue[] = [
  {
    id: "1",
    title: "Issue 1",
    description: "This is the first issue",
  },
  {
    id: "2",
    title: "Issue 2",
    description: "This is the second issue",
  }
]

// app routes
app.post("/issues", async (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.get("/issues/:id", async (req: Request, res: Response) => {
  const issue = issues.find((issue) => issue.id === req.params.id);
  if (!issue) {
    return res.sendStatus(404);
  }
  res.json(issue);
});

app.delete('/issues/:id', async (req: Request, res: Response) => {
  const issueIndex = issues.findIndex((issue) => issue.id === req.params.id);
  if (issueIndex === -1) {
    return res.sendStatus(404);
  }
  console.log(issues[issueIndex]);
  issues.splice(issueIndex, 1);
  res.sendStatus(200);
});

app.put('/issues', (req: Request, res: Response) => {
  // update issue with id matching req.body.id
  const issueIndex = issues.findIndex((issue) => issue.id === req.body.id);
  if (issueIndex === -1) {
    return res.sendStatus(404);
  }
  issues[issueIndex] = req.body;
  console.log(issues[issueIndex]);
  res.sendStatus(200);
});

// app starts listening
app.listen(5003, () => {
  console.log(`Listening on port ${5003}`);
});