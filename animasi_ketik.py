from pyscript import display
from js import document
import asyncio


async def wait_for_element(div_id, poll=0.05):
    """
    Asynchronously waits for a DOM element to be present.
    """
    while True:
        el = document.getElementById(div_id)
        if el:
            return el
        await asyncio.sleep(poll)

async def type_text_anim(div_id: str, text: str):
    """
    Types out the given text into the specified div with a character-by-character animation.
    """
    delay: float = 0.03
    text_container = await wait_for_element(div_id)
    if not text_container:
        print(f"Element with id '{div_id}' not found.")
        return

    text_container.innerText = ""
    for char in text:
        if char == " ":
            text_container.innerText += "\u00A0" # Non-breaking space
        else:
            text_container.innerText += char
        await asyncio.sleep(delay)

# This function will be callable from JavaScript
def start_typing_animation():
    message = """Wow, you've hit 100 cookie clicks. Looks like you liked cookies,
would you like to make some cookies on your own using our recipe?"""
    asyncio.ensure_future(type_text_anim("milestone-text", message))

# Display a confirmation in the console that the script is loaded and ready.
print("Typing animation script loaded and ready.")
