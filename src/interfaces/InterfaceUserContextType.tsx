interface InterfaceUserContextType {
    user: any;
    loginUser: (email: string, password: string) => Promise<InterfaceUser>;
    logOutUser: () => void;
    dataSignUpUser: (username: string, password: string, email: string) => Promise<InterfaceUser>;
  }