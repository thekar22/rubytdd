'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-rubytdd') + ' workflow'
    ));

    var prompts = [{
      name: 'name',
      message: 'Give a name ("my module" becomes "class MyModule" and "my_module.rb"',
      default: 'my module'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.name;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var strs = this.props.name.toLowerCase().split(" ");
    var underscored = strs.join("_");
    var camelCased = "";
    strs.forEach(function(str) {
      camelCased += str.substr(0,1).toUpperCase() + str.substr(1);
    });

    var underscore

    this.fs.copy(
      this.templatePath('Gemfile'),
      this.destinationPath('Gemfile')
    );

    this.fs.copyTpl(
      this.templatePath('rubymodule.rb'),
      this.destinationPath('lib/' + underscored + '.rb'), {
        classname: camelCased
      }
    );

    this.fs.copyTpl(
      this.templatePath('rubyspec.rb'),
      this.destinationPath('spec/' + underscored + '_spec.rb'), {
        classname: camelCased,
        filename: underscored
      }
    );
  },

  install: function () {
    this.spawnCommand('bundle', ['install']);
  }
});
