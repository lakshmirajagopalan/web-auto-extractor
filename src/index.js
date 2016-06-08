import $ from 'cheerio'
import MetaTagsParser from './parsers/metatag-parser'
import MicroRdfaParser from './parsers/micro-rdfa-parser'
import JsonldParser from './parsers/jsonld-parser'

const WAEParsedObject = {
  findByName () {
    
  }
}

const WAEObject = {
  parseMicrodata (config) {
    return Object.assign({}, WAEParsedObject, MicroRdfaParser(this.$html, 'micro', config))
  },
  parseRdfa (config) {
    return Object.assign({}, WAEParsedObject, MicroRdfaParser(this.$html, 'rdfa', config))
  },
  parseJsonld (config) {
    return JsonldParser(this.$html, config)
  },
  parseMetaTags (config) {
    return MetaTagsParser(config)
  },
  parse (type, config = {}) {
    switch (type) {
      case 'meta':
        return parseMetaTags(this.$html, config)
      case 'micro':
      case 'rdfa':
        return parseMicroRdfa(this.$html, type, config)
      case 'jsonld':
        return parseJsonld(this.$html, config)
      default:
        return {
          meta: this.parseMetaTags(config),
          micro: this.parseMicrodata(config),
          rdfa: this.parseRdfa(config),
          jsonld: this.parseJsonld(config)
        }
    }
  }
}

export const createWAEObject = {
  init (html) {
    const $html = $.load(html, { xmlMode: true })
    return Object.assign({}, WAEObject, {
      $html
    })
  }
}
