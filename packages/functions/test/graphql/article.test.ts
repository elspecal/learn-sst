import { Api } from "sst/node/api";
import { expect, it } from "vitest";
import { createClient } from "@learn-sst/graphql/genql";
import { Article } from "@learn-sst/core/article";

it("create an article", async () => {
  const client = createClient({
    url: Api.api.url + "/graphql",
  });

  const article = await client.mutation({
    createArticle: [
      { title: "Hello world", url: "https://example.com" },
      {
        id: true,
      },
    ],
  });
  const list = await Article.list();
  expect(
    list.find((a) => a.articleID === article.createArticle.id)
  ).not.toBeNull();
});
