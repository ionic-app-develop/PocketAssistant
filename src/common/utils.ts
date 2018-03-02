/**
 * Created by Alex on 9/9/2017.
 */

import {calcPossibleSecurityContexts} from "@angular/compiler/src/template_parser/binding_parser";

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

  /**
   * 格式转换
   * 两位数正常显示
   * 一位数在前面补0
   */
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

  /**
   * 升序排序
   */
  static compareUp(data, propertyName) { // 升序排序
    var value1;
    var value2
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        if(object1[propertyName] && object2[propertyName]){
          value1 = object1[propertyName];
          value2 = object2[propertyName];
          return value1.localeCompare(value2);
        }
      }
    }
    else {
      return function (object1, object2) { // 属性值为数字
        if(object1[propertyName] && object2[propertyName]){
          value1 = object1[propertyName];
          value2 = object2[propertyName];
          return value1 - value2;
        }
      }
    }
  }

  /**
   * 降序排序
   */
  static compareDown(data, propertyName) { // 降序排序
    var value1;
    var value2
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        if(object1[propertyName] && object2[propertyName]){
          value1 = object1[propertyName];
          value2 = object2[propertyName];
          return value2.localeCompare(value1);
        }
      }
    }
    else {
      return function (object1, object2) { // 属性值为数字
        if(object1[propertyName] && object2[propertyName]){
          value1 = object1[propertyName];
          value2 = object2[propertyName];
          return value2 - value1;
        }
      }
    }
  }

  /**
   * 排序
   * 支持升序和降序
   * data：数组  propertyName：排序字段 orderby：升序asc，降序desc
   */
  static order(data,propertyName,orderby) {
    orderby = orderby.toLowerCase();
    if(orderby === 'asc') {
      return data.sort(this.compareUp(data,propertyName));
    }else if(orderby === 'desc') {
      return data.sort(this.compareDown(data,propertyName));
    }else {
      return data;
    }
  };

  static getDateDiff(timeStamp,isen) {
    let result: any;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfMonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime();
    let diffValue = now - timeStamp;
    if(diffValue < 0){
      //若日期不符则弹出窗口告之
      //alert("结束日期不能小于开始日期！");
    }
    let monthC = Math.floor(diffValue/month);
    let halfMonthC = Math.floor(diffValue/halfMonth);
    let weekC = Math.floor(diffValue/(7*day));
    let dayC = Math.floor(diffValue/day);
    // let hourC = Math.floor(diffValue/hour);
    // let minC = Math.floor(diffValue/minute);
    var dateTime = new Date();
    dateTime.setTime(timeStamp);
    if(monthC>=1){
      result=  isen ? monthC + 'months ago' : monthC + '个月前';
    }
    else if(weekC>=1){
      result=  isen ? weekC + 'weeks ago' : weekC + '周前';
    }
    else if(dayC>=1){
      result=  isen ? dayC + 'days ago' :  dayC + '天前';
    }else if(new Date(now).getDate() - new Date(timeStamp).getDate()>0){
      result = isen ? 'yesterday' : '昨天' + this.formatTime(dateTime);
    }else{
      return this.formatTime(dateTime);
    }
    // else if(hourC>=1){
    //   result= hourC + isen ? 'hours ago' : '个小时前';
    // }
    // else if(minC>=1){
    //   result= minC + isen ? 'minutes ago' : '分钟前';
    // }else
    //   result="刚刚";
    return result;
  }

  // datetime转时间戳
  static getTimeStamp(dateTime) {
    return Date.parse(dateTime.replace(/-/gi,"/"));
  }

  // 格式化时间 hh:mm
  static formatTime(dateTime) {
    var   hour = dateTime.getHours();
    var   minute = dateTime.getMinutes();
    return  hour+":"+ this.formatTen(minute);
  }

  // 格式化datetime
  static formatDateDiff(dateTime: string, isen: boolean): string {
    return this.getDateDiff(this.getTimeStamp(dateTime), isen);
  }

  static cutstr(str,len)
  {
       let str_length = 0;
       let str_len = 0;
       let str_cut = new String();
       str_len = str.length;
       for(var i = 0;i<str_len;i++)
       {
          let a = str.charAt(i);
          str_length++;
          if(escape(a).length > 4)
          {
           //中文字符的长度经编码之后大于4
           str_length++;
           }
           str_cut = str_cut.concat(a);
           if(str_length>=len)
           {
           str_cut = str_cut.concat("...");
           return str_cut;
           }
      }
      //如果给定字符串小于指定长度，则返回源字符串；
      if(str_length<len){
       return  str;
      }
  }
}
