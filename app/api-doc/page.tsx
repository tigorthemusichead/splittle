import { getApiDocs } from "@/lib/swagger"

import ReactSwagger from "./react-swagger"

export default async function IndexPage() {
  const spec = await getApiDocs()
  return (
    <section className="bg-white w-100 min-h-100vh">
      <div className="container mx-auto">
        <ReactSwagger spec={spec} />
      </div>
    </section>
  )
}
