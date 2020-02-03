module.exports = {
  title (block) {
    const el = block.querySelector('.kb_t')
    if (!el) return null
    return el.textContent
  },
  who (block) {
    const el = block.querySelector('.kb_w')
    if (!el) return null
    const siblingText = getSiblingText(el)
    return siblingText
      .split(';')
      .map((group) => group.trim())
  },
  eligibility (block) {
    const el = block.querySelector('.kb_e')
    if (!el) return null
    return getSiblingText(el)
  },
  description (block) {
    const unlabeledParagraphs = Array.from(block.querySelectorAll('p:not([class])'))
    const el = unlabeledParagraphs.find((paragraph) => !paragraph.querySelector('span'))
    if (!el) return null
    return el.textContent
  },
  website (block) {
    const el = block.querySelector('.kb_web + a')
    if (!el) return null
    return el.textContent
  },
  telephone (block) {
    const el = block.querySelector('.kb_tel')
    if (!el) return null
    return el.textContent.replace('Tel: ', '')
  },
  email (block) {
    const el = block.querySelector('.kb_mail + a')
    if (!el) return null
    return el.textContent
  }
}

function getSiblingText (el) {
  const children = el.parentNode.childNodes
  return children[children.length - 1].textContent
}
