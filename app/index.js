'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`恒腾网络h5脚手架生成器!`)
    );

    const prompts = [
      {
        name: 'title',
        message: '请输入title名称'
      },
      {
        name: 'appid',
        message: '请输入测试环境微信公众号的appid'
      },
      {
        name: 'appsecret',
        message: '请输入测试环境微信公众号的appsecret'
      },
      {
        name: 'appid_release',
        message: '请输入正式环境微信公众号的appid'
      },
      {
        name: 'appsecret_release',
        message: '请输入正式环境微信公众号的appsecret'
      },
      {
        name: 'wxCheckServer',
        message: '请输入服务器验证所需要的文件名字(比如:MP_verify_9rjS9nuDxYl3Zq6G.txt)'
      },
      {
        name: 'jsSdk_PHP_token',
        message: '请输入php读取微信配置的token(比如:gh_e8a7b9983c24)'
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.'),
      this.destinationPath('.'),
      { title: 'Templating with Yeoman' }
    );

    //隐藏文件
    let target = [
      '_babelrc',
      '_eslintrc.js',
      '_gitignore',
      '_postcssrc.js',
	  '_editorconfig'
    ];

    for(let i = 0; i < target.length; i++) {
      let file = target[i];
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath("."+file.slice(1))
      );

	  this.fs.delete(file);
    }

    let tplFile = ['./server/app.js', './src/main.js', './src/lib/wxTools/wxSdk.js']
    for(let i = 0; i < tplFile.length; i++) {
      let file = tplFile[i];
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      );
    }
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true,
      yarn: false,
      callback: function () {
        this.log('Everything is ready!');
      }
    });
  }
};
