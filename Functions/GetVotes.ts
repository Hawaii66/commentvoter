import { VoteOptions, VoteResults } from "../Interfaces/Comment";
import { GetComments } from "./GetYoutubeComments";

export const GetVotesFromVideo = async (
  videoId: string,
  voteOptions: VoteOptions
): Promise<VoteResults> => {
  //Get comments from a video
  const comments = await GetComments(videoId);

  //Convert options to a result dict O(1) assignment
  var results: { [key: string]: number } = {};
  voteOptions.options.forEach((option) => {
    results[option] = 0;
  });

  //Loop over all comments and check for multiple votes in same comment
  comments.forEach((comment) => {
    var selectedOption = "";
    var foundError = false;
    voteOptions.options.forEach((option) => {
      if (comment.comment.includes(`[${option}]`)) {
        if (selectedOption !== "") {
          foundError = true;
        } else {
          selectedOption = option;
        }
      }
    });

    //If theres is not a error and a vote, count the vote
    if (selectedOption !== "" && foundError === false) {
      results[selectedOption] += 1;
    }
  });

  //Convert dictionary to array and return results
  return {
    options: Object.entries(results).map((i) => {
      return {
        option: i[0],
        votes: i[1],
      };
    }),
  };
};
