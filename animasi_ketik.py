from js import document
import asyncio

async def wait_for_element(div_id, poll=0.05):
    while True:
        el = document.getElementById(div_id)
        if el:
            return el
        await asyncio.sleep(poll)

async def type_text(div_id: str, text: str):
    delay: float = 0.03
    pesan = await wait_for_element(div_id)
    pesan.innerText = ""
    for huruf in text:
        if huruf == " ":
            pesan.innerText += "\u00A0" #\u00A0 adalah non-breaking space
        else:
            pesan.innerText += huruf
        await asyncio.sleep(delay)
pesan: str = """Wow, you've hit 100 cookie clicks. Looks like you liked cookies, 
    would you like to make some cookies on your own using our recipe?"""
asyncio.ensure_future(type_text("milestone-message", pesan))