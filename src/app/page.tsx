import { GlobalCommands } from "../components/global-commands"

export default async function Page() {
  return (
    <main className="container mx-auto px-3 py-6">
      <section className="flex flex-col gap-2 pt-12">
        <p className="font-semibold">
          This is an example of an admin portal might look like. It leverages RSCs to fetch the Slash commands
          associated with the Discord bot!
        </p>
        <GlobalCommands />
      </section>
    </main>
  )
}
