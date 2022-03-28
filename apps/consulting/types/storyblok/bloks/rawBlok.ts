import { TBoardRawData } from './board';
import { THeroRawData } from './hero';
import { TStickyNotesRawData } from './stickyNotes';
import { TTeaserRawData } from './teaser';
import { TFeatureArticleRawData } from './featureArticle';

export type TRawBlok =
  | THeroRawData
  | TBoardRawData
  | TTeaserRawData
  | TStickyNotesRawData
  | TFeatureArticleRawData;
