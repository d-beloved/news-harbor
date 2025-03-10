import { ArticleService, ArticleServiceConfig } from "./ArticleService";
import { GuardianAPIService } from "./GuardianApiService";
import { NewsApiService } from "./NewsApiService";
import { NYTimesService } from "./NytApiService";

export const createArticleServiceConfig = {
  services: {
    guardian: new GuardianAPIService(),
    nyt: new NYTimesService(),
    newsapi: new NewsApiService(),
  },
} as ArticleServiceConfig;

export const articleService = new ArticleService(createArticleServiceConfig);
