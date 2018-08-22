/* == LEGACY CODE, DO NOT DELETE!!! ==
        
        console.log('Traverse typeof item == str', item);
        let command = this.parseCommand(item);

        switch (command.type) {

          case 'command':
            console.log('Traverse.command = ', command);
            if (command.hasArgs) {
              console.log('Traverse.command.hasArgs', command);
              obj[key] = this.commands[command.name](...command.args);
              console.log('Traverse.command.obj[key]', obj[key]);
            } else {
              console.log('Traverse.command.noArgs ', command);
              obj[key] = this.commands[command.name]();
            }
            break;

          case 'pointer':
            console.log("Traverse.pointer = ", command);
            let matches = obj[key].match(/#\w+/gi);
            if (matches && matches.length > 1) {
              console.log("matches ", matches);

              obj[key] = command.origin.replace(/#\w+/gi, ptr => {
                return obj[this.getName(ptr)];
              });
            } else {
              obj[key] = obj[command.name];
            }

            break;

          case 'parent':
            obj[key] = command.origin.replace(/\^\w+/gi, mom => {
              console.log('Traverse.parent.mom', mom);
              console.log('Traverse.parent', parent);
              console.log('Traverse.parent.typeof', typeof parent[mom.replace('^', '')]);
              return typeof parent[mom.replace('^', '')] === 'number' ? parseInt(parent[mom.replace('^', '')]) : parent[mom.replace('^', '')];
            });
            console.log('Traverse.parent.key', key);
            break;
        }*/
