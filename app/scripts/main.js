$(function() {
  var data = [
    { 
      action: 'type',
      strings: ["npm install -g composr-cli^400"],
      output: '<span class="gray">+composr-cli@1.0.0 installed</span><br>&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ["cd myproject^400"],
      output: ' ',
      postDelay: 1000
    },
    { 
      action: 'type',
      //clear: true,
      strings: ['composr init^400'],
      output: '<span class="green">✓</span> <span class="gray">+phrases folder created</span><br>' + 
            '<span class="green">✓</span> <span class="gray">+test folder created</span><br>'+
            '<span class="green">✓</span> <span class="gray">+.composrrc file created</span><br>'
    },
    { 
      action: 'type',
      strings: ["composr publish"],
      output: '<span class="green">✓</span> 15 phrases published',
      postDelay: 2000
    },
    { 
      action: 'type',
      strings: ["corbel-composr"],
      output: 'Server Started - Port 3000 - 15 endpoints enabled',
      postDelay: 2000
    },
    { 
      action: 'type',
      strings: ["YAY! :)"],
      postDelay: 2000
    }
    
  ];
  runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];

    // cleanup for next execution
    prompt.removeData();

    $('.typed-cursor').text('');

    if(script.clear === true){
      $('.command-history').html('');
    }

    prompt.typed({
      strings: script.strings,
      typeSpeed: script.action === 'type' ? 30 : 0,
      callback: function() {

        var history = $('.command-history').html();

        history = history ? [history] : [];

        history.push('$ ' + prompt.text());

        if(script.output) {
          history.push(script.output);
          prompt.html('');
          $('.command-history').html(history.join('<br>'));
        }
        
        // Run next script
        pos++;
        if(pos < data.length) {
          setTimeout(function() {
            runScripts(data, pos);
          }, script.postDelay || 1000);
        }
      }
    });
  
}
