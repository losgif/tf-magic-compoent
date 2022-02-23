// less模块声明
declare module '*.less' {
  const content: { [key: string]: any }
  export default content
}

// css模块声明
declare module '*.css' {
  const content: { [key: string]: any }
  export default content
}
