import { Ctx } from "blitz"

const logout = async (_: any, ctx: Ctx) => await ctx.session.$revoke()

export default logout
