export const mappTree = (data) => {
	for (let i = 0; i < data?.length; i++) {
		data[i].children = data[i].childCategories;
		data[i].title = data[i].categoryName;
		data[i].key = data[i].id;

		if (data[i].hasChildren) {
			mappTree(data[i].childCategories);
		}
	}
	return data;
};
export const getParentKey = (key, tree) => {
	let parentKey;
	for (let i = 0; i < tree.length; i++) {
		const node = tree[i];
		if (node.children) {
			if (node.children.some((item) => item.key === key)) {
				parentKey = node.key;
			} else if (getParentKey(key, node.children)) {
				parentKey = getParentKey(key, node.children);
			}
		}
	}
	return parentKey;
};
