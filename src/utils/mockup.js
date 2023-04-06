import { isNil } from 'lodash';

export const init = {
	data: {
		memberId: 1,
		categories: [
			{
				id: 3343434343,
				categoryName: 'Grain 1222323',
				categoryParentId: null,
				hasChildren: false,
				childCategories: null,
			},
			{
				id: 1,
				categoryName: 'QuyenTest',
				categoryParentId: null,
				hasChildren: true,
				childCategories: [
					{
						id: 3,
						categoryName: 'Grain',
						categoryParentId: 1,
						hasChildren: false,
						childCategories: null,
					},
					{
						id: 4,
						categoryName: 'Dairy',
						categoryParentId: 1,
						hasChildren: false,
						childCategories: null,
					},
					{
						id: 5,
						categoryName: 'Meat',
						categoryParentId: 1,
						hasChildren: false,
						childCategories: null,
					},
					{
						id: 6,
						categoryName: 'Confections',
						categoryParentId: 1,
						hasChildren: true,
						childCategories: [
							{
								id: 10,
								categoryName: 'Confections',
								categoryParentId: 6,
								hasChildren: false,
								childCategories: null,
							},
							{
								id: 9,
								categoryName: 'Beverages',
								categoryParentId: 6,
								hasChildren: true,
								childCategories: [
									{
										id: 102,
										categoryName: 'Leave a light on',
										categoryParentId: 9,
										hasChildren: false,
										childCategories: null,
									},
									{
										id: 103,
										categoryName: 'DarkNight',
										categoryParentId: 9,
										hasChildren: false,
										childCategories: null,
									},
								],
							},
						],
					},
					{
						id: 8,
						categoryName: 'Cereals',
						categoryParentId: 1,
						hasChildren: true,
						childCategories: [
							{
								id: 101,
								categoryName: 'We dont talk anymore',
								categoryParentId: 8,
								hasChildren: false,
								childCategories: null,
							},
						],
					},
				],
			},
			{
				id: 122,
				categoryName: 'Tin ga',
				categoryParentId: null,
				hasChildren: false,
				childCategories: null,
			},
			{
				id: 1223,
				categoryName: 'Tin ga 2323',
				categoryParentId: null,
				hasChildren: true,
				childCategories: [
					{
						id: 1224556,
						categoryName: 'abc',
						categoryParentId: 1223,
						hasChildren: false,
						childCategories: null,
					},
					{
						id: 12245566677,
						categoryName: 'abc 23232',
						categoryParentId: 1223,
						hasChildren: true,
						childCategories: [
							{
								id: 122455634343434343,
								categoryName: 'errrrrr',
								categoryParentId: 12245566677,
								hasChildren: false,
								childCategories: null,
							},
						],
					},
				],
			},
		],
	},
};

// function findPath({ id, childCategories, ...rest }, target) {
// 	if (id === target) return [id]; // if the value is found return it wrap in an array

// 	for (const child of childCategories ?? []) {
// 		// iterate the children or an empty array
// 		const leaf = findPath(child, target); // use findPath on all children

// 		if (leaf) return [id, ...leaf]; // if a leaf is found (not null) spread it to the current array, and return it
// 	}

// 	return null;
// }
// console.log(findPath(init.data.categories), 6);

const convertParentPath = (parent, current) => {
	if (parent === null) return current;
	return `${parent}-${current}`;
};

export const de_quy = (data, parent_path) => {
	if (data.childCategories === null) {
		return {
			...data,
			title: data.categoryName,
			key: convertParentPath(parent_path, data.id),
			categoryLevel: convertParentPath(parent_path, data.id)
				.toString()
				.split('-').length,
			children: data.childCategories,
		};
	}
	if (Array.isArray(data.childCategories)) {
		const key = convertParentPath(parent_path, data.id);
		const childCategories = data.childCategories.map((d) => de_quy(d, key));
		console.log(key);
		return {
			...data,
			title: data.categoryName,
			key,
			categoryLevel: key.toString().split('-').length,
			childCategories,
			children: childCategories,
		};
	}
};
// const result = init.data.categories.map((c) => de_quy(c, null));
// console.log(result);
// console.log(de_quy());

export const getParentNode = (nodeTarget, tree) => {
	let parentKey;
	for (let i = 0; i < tree.length; i++) {
		const node = tree[i];
		if (node.children) {
			if (node.children.some((item) => item.key === nodeTarget.key)) {
				parentKey = node;
			} else if (getParentNode(nodeTarget, node.children)) {
				parentKey = getParentNode(nodeTarget, node.children);
			}
		}
	}
	return parentKey;
};
