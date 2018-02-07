/**
 * Created by Alex on 9/9/2017.
 */

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
export class Utils {

  constructor() {
  }

  static isEmpty(value): boolean {
    return value == null || typeof value === 'string' && value.length === 0;
  }

  static isNotEmpty(value): boolean {
    return !Utils.isEmpty(value);
  }

  /**
   * 格式“是”or“否”
   * @param value
   * @returns {string|string}
   */
  static formatYesOrNo(value: number | string): string {
    return value == 1 ? '是' : (value == '0' ? '否' : null);
  }

  /**
   * 格式“男”or“女”
   * @param value
   * @returns {string|string}
   */
  static formatMenOrWomen(value: number | string): string {
    return value == 1 ? '男' : (value == '0' ? '女' : null);
  }

  static formatTen(num: number | string): string {
    return num > 9 ? (num + "") : ("0" + num);
  }

  /**
   * 时间转换成日期格式"yyyy-MM-dd HH:mm:ss"
   * @param value
   * @returns {string|string}
   */
  static formatDate(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + ' ' + this.formatTen(hour) + ':' + this.formatTen(minute) + ':' + this.formatTen(second);
  }

  static compareUp(data, propertyName) { // 升序排序
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1.localeCompare(value2);
      }
    }
    else {
      return function (object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1 - value2;
      }
    }
  }

  static compareDown(data, propertyName) { // 降序排序
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2.localeCompare(value1);
      }
    }
    else {
      return function (object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
      }
    }
  }

  static order(data,propertyName,orderby) {
    if(orderby === 'asc') {
      return data.sort(this.compareUp(data,propertyName));
    }else if(orderby === 'desc') {
      return data.sort(this.compareDown(data,propertyName));
    }else {
      return data;
    }
  };
}
