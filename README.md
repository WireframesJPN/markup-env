# Wire Frames Markup Environment

parcel / pug / less / babel7 を使ったマークアップ環境です

## config.yaml

config.yamlにマークアップデータの最終出力設定を記述できます。

```yaml
file_base_url: "."
dev_base: "/src"
dist_base: "/dist"
html_base: "/"
js_base: "/js"
css_base: [ "/less", "/style" ]
html:
  - index.pug
js:
  - scripts.js
less:
  - styles.less
copy_files:
  - "/img"
  - [ "/less/fonts", "/style/fonts" ]
  - [ "/less/ajax-loader.gif", "/style/ajax-loader.gif" ]
``` 

### `file_base_url`

HTMLの`href`/`src`相対パスで指定されている箇所のベースとなるパスを指定します。
`ftp_base_url`に`.`と指定した場合以下の様に置き換えられます。


pug file
```pug
img(src="img/test.png" width="100" height="100" alt="test image")
```

distribution file
```html
<img src="./img/test.pug" width="100" height="100" alt="test image" /> 
```

### `dev_base`

開発用のディレクトリを指定します。デフォルトは`src`です。
もし変更する場合は、 **`parcel`の起動時のディレクトリも変更する必要があるので** 注意しください。

```yaml
dev_base: '/dev'
```

もし`dev_base`を使って`/dev`を指定した場合、`package.son`の`parcel`の起動スクリプトの記述も以下のように`dev/`から指定するように変更をお願いします。

```json
  "scripts": {
    "start": "NODE_ENV=test parcel dev/*.pug",
    "build:parcel": "parcel build dev/*.pug --public-url ./",
  },
```


...

他の設定はボチボチ記述していきます。。