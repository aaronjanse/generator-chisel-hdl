'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the stupendous ${chalk.red('generator-chisel-hdl')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of the project?',
        default: 'my-chisel-project'
      },
      {
        type: 'input',
        name: 'chipName',
        message: 'What is the name of your chip? (in CamelCase)',
        default: 'FastGCD'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.chipNameLower = props.chipName.toLowerCase().replace(/ /g, '');
      props.chipNameUpper = props.chipName.toUpperCase().replace(/ /g, '');
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('**/*'), this.destinationPath('.'), this.props);
    this.fs.copyTpl(
      `${this.sourceRoot()}/src/main/scala/chip/Chip.scala`,
      `src/main/scala/${this.props.chipNameLower}/${this.props.chipName}.scala`,
      this.props
    );
    this.fs.delete('src/main/scala/chip/Chip.scala');

    this.fs.copyTpl(
      `${this.sourceRoot()}/src/test/scala/chip/ChipMain.scala`,
      `src/test/scala/${this.props.chipNameLower}/${this.props.chipName}Main.scala`,
      this.props
    );
    this.fs.delete('src/test/scala/chip/ChipMain.scala');

    this.fs.copyTpl(
      `${this.sourceRoot()}/src/test/scala/chip/ChipUnitTest.scala`,
      `src/test/scala/${this.props.chipNameLower}/${this.props.chipName}UnitTest.scala`,
      this.props
    );
    this.fs.delete('src/test/scala/chip/ChipUnitTest.scala');

    this.spawnCommand('git', ['init']);
  }

  install() {}
};
