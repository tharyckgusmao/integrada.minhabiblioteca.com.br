var ConvertLivros = function() {
    var path = process.argv[2]
    var name = process.argv[3]
    var sys = require('sys')
    var exec = require('child_process').exec;
  	var command = null;	
    let plat = process.platform;

    if (plat == 'linux') {

        command = "convert $(ls " + path + "/* | sort -V) " + name + ".pdf";

    } else {

        command = "convert $(dir " + path + "/*) " + name + ".pdf";

    }

    function puts(error, stdout, stderr) { sys.puts(stdout) }

    exec(command, puts);

};

ConvertLivros();
