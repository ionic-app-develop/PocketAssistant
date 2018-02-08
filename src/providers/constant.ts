export class PublicVar {
  private static basePort: string = '8100';
  private static baseURL: string;
  private static userToken: string;
  private static userName: string;
  private static userId: string;
  private static notificationNum: any;

  public static GetBasePort(): string {
    return this.basePort;
  }

  public static setBasePort(port: string) {
    this.basePort = port;
  }

  public static GetBaseURL(): string {
    return this.baseURL;
  }

  public static setBaseURL(url: string) {
    this.baseURL = `http://${url}`;
  }

  public static getUserToken() {
    return this.userToken;
  }

  public static setUserToken(token: string) {
    this.userToken = token;
  }

  public static getUserName() {
    return this.userName;
  }

  public static setUserName(userName: string) {
    this.userName = userName;
  }

  public static getUserId() {
    return this.userId;
  }

  public static setUserId(userId: string) {
    this.userId = userId;
  }

  public static getNotificationNum() {
    return this.notificationNum;
  }

  public static setNotificationNum(notificationNum: any) {
    this.notificationNum = notificationNum;
  }
}
