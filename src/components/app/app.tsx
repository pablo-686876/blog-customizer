import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const article_style = (style: ArticleStateType): CSSProperties => {
		return {
			'--font-family': style.fontFamilyOption.value,
			'--font-size': style.fontSizeOption.value,
			'--font-color': style.fontColor.value,
			'--container-width': style.contentWidth.value,
			'--bg-color': style.backgroundColor.value,
		} as CSSProperties;
	};

	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main className={clsx(styles.main)} style={article_style(articleState)}>
			<ArticleParamsForm onClick={setArticleState} />
			<Article />
		</main>
	);
};
