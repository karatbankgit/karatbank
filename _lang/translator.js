function trans_to_obj(text) {
	let trans_de_entries = text.trim().split('\n\n')
	let trans_de_arr = []
	
	for(let i = 0; i < trans_de_entries.length; i++) {
		
		let entry = trans_de_entries[i].split('\n')
		if(entry.length < 2) continue
			
		trans_de_arr.push(entry)	
	}

	return trans_de_arr;
}


function textNodesUnder(el){
	var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
	while(n=walk.nextNode()) a.push(n);
	return a;
}


function kickoff_translation(dictionary_file){
	let translations_de = trans_to_obj(dictionary_file)
	let textnodes = textNodesUnder(document.body)
	
	for(let i = 0; i < textnodes.length; i++) {
		let tn = textnodes[i]
		if(tn.nodeValue.trim() === '') continue;
		let found = false
		
		for(let j = 0; j < translations_de.length; j++){
			let nodeValue = tn.nodeValue.trim().replace(/\s+/g, " ")
			
			if(translations_de[j][2] && translations_de[j][2].includes('R')) {
				let regex = new RegExp(translations_de[j][0], "g")
				let regreplace = translations_de[j][1]
				let diff = nodeValue.replace(regex, regreplace)
				if(diff === tn.nodeValue.trim().replace(/\s+/g, " ")) continue;
				tn.nodeValue = diff
			}
			
			if(nodeValue.toLowerCase() != translations_de[j][0].toLowerCase()) continue;
			tn.nodeValue = translations_de[j][1]
			found = true

		}

		if(!found) console.log('Not found:', tn.nodeValue, translations_de )
		
	}
}

let setlanguage = localStorage.getItem('lang')
let dictfile = window['dict_' + setlanguage]
if(dictfile) kickoff_translation(dictfile)
if(setlanguage == 'ar') kickoff_translation(dict_ar)
if(setlanguage == 'br') kickoff_translation(dict_br)
if(setlanguage == 'de') kickoff_translation(dict_de)
if(setlanguage == 'nl') kickoff_translation(dict_nl)
if(setlanguage == 'es') kickoff_translation(dict_es)
if(setlanguage == 'id') kickoff_translation(dict_id)
if(setlanguage == 'is') kickoff_translation(dict_is)
if(setlanguage == 'jp') kickoff_translation(dict_jp)
if(setlanguage == 'ru') kickoff_translation(dict_ru)
if(setlanguage == 'th') kickoff_translation(dict_th)
if(setlanguage == 'vn') kickoff_translation(dict_vn)
if(setlanguage == 'zh') kickoff_translation(dict_zh)
console.log('Language:', setlanguage)
document.documentElement.lang = setlanguage


