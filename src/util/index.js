/* © 2017 
 * @author HuyPham
 */
/* global window, navigator */
import {each} from 'lodash';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const convertNumberTo2 = (number) => {
	if (number < 10) {
		return `0${number}`;
	}
	return number.toString();
};

export const isEmptyValue = (value) => {
	return !(value && value.length && value.trim().length);
};

export const isDuplicatedValue = (...values) => {
	const valuesParsed = values.map(value => value.trim().toLowerCase());
	return valuesParsed.some((value, index) => valuesParsed.indexOf(value) !== index);
};

export const parseDateToStr = (date) => {
	if (date.constructor.name !== 'Date') {
		date = new Date(date);
	}
	if (date.toDateString() === (new Date()).toDateString()) {
		return 'Today';
	}
	const day = date.getDate();
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};

export const parseDateToInputValue = (date) => {
	if (date.constructor.name !== 'Date') {
		date = new Date(date);
	}
	const day = convertNumberTo2(date.getDate());
	const month = convertNumberTo2(date.getMonth() + 1);
	const year = date.getFullYear();
	return `${year}-${month}-${day}`;
};

export const checkSameDate = (date1, date2) => {
	return parseInt(date1.getFullYear(), 10) === parseInt(date2.getFullYear(), 10)
	&& parseInt(date1.getMonth(), 10) === parseInt(date2.getMonth(), 10)
	&& parseInt(date1.getDate(), 10) === parseInt(date2.getDate(), 10);
};

export const getMonthStringFromMonthNumber = (number) => {
	return MONTHS[number];
};

export const displayTreeCategoryNormal = (categories) => {
	let categoriesList = [];
	each(categories, function (cate_info) {
		if (cate_info.special == false && cate_info.parent_id == 0) {
			categoriesList.push({...cate_info});
			each(categories, function (child_cate) {
				if (child_cate.parent_id == cate_info.id) {
					if (child_cate.name.indexOf('-----') < 0) {
						child_cate.name = '----- ' + child_cate.name;
					}
					categoriesList.push({...child_cate});
				}
			});
		}
	});
	return {...categoriesList};
}

export const mobilecheck = function() {
  var check = false;
  let checkW = false;
//   if (window.innerWidth < 768) {
// 	  checkW = true;
//   }
  return (check || checkW);
};
export const isEmpty = function(arg) {
	for (var item in arg) {
		return false;
	}
	return true;
}
export const objectSize = function ( obj ) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
}