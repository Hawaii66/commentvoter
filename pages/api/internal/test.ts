import { NextApiRequest, NextApiResponse } from "next";
import { GetVotesFromVideo } from "../../../Functions/GetVotes";
import { GetComments } from "../../../Functions/GetYoutubeComments";
import { VoteOptions, YouTubeComment } from "../../../Interfaces/Comment";

interface VoteRequest extends NextApiRequest {
  body: {
    options: string[];
  };
}

export default async function handler(
  req: VoteRequest,
  res: NextApiResponse<any>
) {
  const params = req.query;
  const youtubeVideoId = params.videoId?.toString() || "";
  const apiKey = params.apiKey?.toString() || "";
  if (youtubeVideoId === "") {
    res.status(400).send("Wrong format for YouTube Video ID string");
    return;
  }

  if (apiKey === "") {
    res.status(401).send("You must supply a API key");
    return;
  }

  const body = req.body;
  const voteOptions: VoteOptions = {
    options: body.options,
  };

  const result = await GetVotesFromVideo(youtubeVideoId, voteOptions);
  res.json(result);
}
