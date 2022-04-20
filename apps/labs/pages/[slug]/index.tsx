import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Api } from '@quansight/shared/storyblok-sdk';
import {
  Page,
  Layout,
  SEO,
  DomainVariant,
} from '@quansight/shared/ui-components';
import { BlokProvider } from '../../components/BlokProvider/BlokProvider';

import { getPaths } from '../../services/getPaths/getPaths';
import { isPageType } from '../../services/contentTypes/isPageType';

import { ISlugParams, TContainerProps } from '@quansight/shared/types';
import { TRawBlok } from '../../types/storyblok/bloks/rawBlock';

const Container: FC<TContainerProps> = ({ data, footer, preview }) => (
  <Layout footer={footer}>
    <SEO
      title={data.content.title}
      description={data.content.description}
      variant={DomainVariant.Labs}
    />
    {isPageType(data?.content?.component) && (
      <Page data={data} preview={preview}>
        {(blok: TRawBlok) => <BlokProvider blok={blok} />}
      </Page>
    )}
  </Layout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await Api.getLinks();
  return {
    paths: getPaths(data?.Links.items),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  TContainerProps,
  ISlugParams
> = async ({ params: { slug }, preview = false }) => {
  const { data } = await Api.getPageItem({ slug });
  const { data: footer } = await Api.getFooterItem();

  return {
    props: {
      data: data.PageItem,
      footer: footer.FooterItem,
      preview,
    },
  };
};

export default Container;