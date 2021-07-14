import HomePage from "app/pages/home"
import { Routes } from "blitz"

const IndexPage = () => <HomePage />

IndexPage.redirectAuthenticatedTo = Routes.DashboardPage()

export default IndexPage
