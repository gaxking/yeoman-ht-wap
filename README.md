
# yeoman-ht-wap
因为公司经常做不同的手机项目，于是给公司做了一个h5项目脚手架

install
------------
    npm install -g yo  
    npm install -g generator-generator
    yo generator
    
配置
------------
复制 generators/app 目录到生成的generator-xxxx目录下  
配置文件 generators/app/index.js  
具体Api可查看 [http://yeoman.io/codelab/index.html](http://yeoman.io/codelab/index.html)  

使用
------------
npm link // 用当前目录，yo命令配置到全局

yo xxxx

根据设定的提示和输入信息，Yeoman会一步一步安装你的项目文件，最终生成你指定的项目结构。
