// Chakra UIのグローバルテーマの設定
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // 色名.濃さ
        backgroundColor: "orange.50",
        color: "gray.800",
      },
      p: {
        // レスポンシブデザインの書き方。
        fontSize: { base: "md", md: "lg" },
        lineHeight: "tall"
      }
    }
  }
})

export default theme;