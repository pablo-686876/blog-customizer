import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type TArticleParamsFormProps = {
	onClick: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onClick }: TArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(fontFamilyOptions[0]);
	const [selectedColor, setSelectedColor] = useState(fontColors[0]);
	const [selectedBgColor, setSelectedBgColor] = useState(backgroundColors[0]);
	const [selectedWidth, setSelectedWidth] = useState(contentWidthArr[0]);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);

	const toggle = () => {
		setOpen(!open);
	};

	const articleRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				articleRef.current &&
				!articleRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<section ref={articleRef}>
			<ArrowButton isOpen={open} onClick={toggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form
					className={styles.form}
					onSubmit={(e: React.FormEvent) => {
						e.preventDefault();
					}}>
					<div className={styles.formContainer}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={selectedFont}
							onChange={setSelectedFont}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
						<RadioGroup
							selected={selectedFontSize}
							name='radio'
							onChange={setSelectedFontSize}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
						<Select
							selected={selectedColor}
							onChange={setSelectedColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={selectedBgColor}
							onChange={setSelectedBgColor}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={selectedWidth}
							onChange={setSelectedWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSelectedFont(defaultArticleState.fontFamilyOption);
								setSelectedFontSize(defaultArticleState.fontSizeOption);
								setSelectedColor(defaultArticleState.fontColor);
								setSelectedBgColor(defaultArticleState.backgroundColor);
								setSelectedWidth(defaultArticleState.contentWidth);
								onClick(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => {
								onClick({
									fontFamilyOption: selectedFont,
									fontSizeOption: selectedFontSize,
									fontColor: selectedColor,
									backgroundColor: selectedBgColor,
									contentWidth: selectedWidth,
								});
							}}
						/>
					</div>
				</form>
			</aside>
		</section>
	);
};
