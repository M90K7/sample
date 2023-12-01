using Microsoft.AspNetCore.Mvc;

using ChatGPT.Net;

namespace chat_ai.Controllers
{
    [Route("chat")]
    public class ChatAiController : ControllerBase
    {
        static ChatGpt bot = new ChatGpt("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");

        static Dictionary<string, string> chatList = new Dictionary<string, string>();

        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery] string question)
        {
            var key = chatList.Keys
                .Where(k => k.Contains(question) || question.Contains(k))
                .FirstOrDefault();

            if (key != null)
            {
                Thread.Sleep(1500);
                return Ok(new { response = chatList[key] });
            }

            var response = await bot.Ask(question, "default");
            return Ok(new { response });
        }
    }
}
