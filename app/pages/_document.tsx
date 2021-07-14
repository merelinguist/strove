import { BlitzScript, Document, DocumentHead, Head, Html, Main } from "blitz"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <DocumentHead>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </DocumentHead>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
