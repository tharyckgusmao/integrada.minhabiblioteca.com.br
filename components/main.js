"user strict";

import { login } from './login.js';
import { getPages } from './getPages.js';
import { downloadEbook } from './downloadEbook.js';

let params = process.argv.slice(2);

let ebook = params[0];
let name = params[1];
let username = params[2];
let pass = params[3];

login(username,pass,() => {

	getPages(ebook,(pages)=>{

		downloadEbook(ebook,pages,name,()=>{
			console.log("Concluido")
		});

	})


});


