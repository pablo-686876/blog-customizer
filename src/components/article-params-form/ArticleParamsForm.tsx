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
	onApply: (state: ArticleStateType) => void;
	initialState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	initialState,
}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		initialState.fontFamilyOption
	);
	const [selectedColor, setSelectedColor] = useState(initialState.fontColor);
	const [selectedBgColor, setSelectedBgColor] = useState(
		initialState.backgroundColor
	);
	const [selectedWidth, setSelectedWidth] = useState(initialState.contentWidth);
	const [selectedFontSize, setSelectedFontSize] = useState(
		initialState.fontSizeOption
	);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const articleRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const handleClickOutside = (e: MouseEvent) => {
			if (
				articleRef.current &&
				!articleRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		const handleKeyDownOutside = (e: KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === 'Escape') {
				setIsOpen(false);
			}
		};
		window.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('keydown', handleKeyDownOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('keydown', handleKeyDownOutside);
		};
	}, [isOpen]);

	return (
		<section ref={articleRef}>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
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
								onApply(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => {
								onApply({
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
