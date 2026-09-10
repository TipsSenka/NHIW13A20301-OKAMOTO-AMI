# NHIW13A20301-OKAMOTO-AMI
岡本

`doc/` の資料（`09CloudFlareの活用.pptx` ほか）に沿って、Cloudflare Workers(API)とPages(表示画面)の最小構成を作成。

## ディレクトリ構成

```
doc/
pages/
	index.html
	app.js
	styles.css
worker/
	src/index.js
	package.json
	wrangler.toml
```

## Workers(API) の起動

1. `worker` に移動
2. 依存関係をインストール
3. ローカル実行

PowerShell例:

```powershell
Set-Location .\worker
npm.cmd install
npm.cmd run dev
```

ローカルURLは通常 `http://127.0.0.1:8787`。

## Pages(表示画面) の確認

`pages/index.html` をブラウザで開く。

- ベースURLにWorkerのURLを入力
- ボタンから `/api/course` `/api/fortune` `/api/events` を実行
- 名前入力後に「あいさつを取得」で `/api/hello?name=...` を実行

## API一覧

- `GET /api/course`: 学科紹介JSON
- `GET /api/hello?name=山田`: 入力検証付き・時間帯別あいさつJSON
- `GET /api/fortune`: おみくじJSON（ランダム）
- `GET /api/events`: イベント一覧JSON（配列）
- 未定義パス: `404 not_found`

## デプロイ

```powershell
Set-Location .\worker
npm.cmd run deploy
```

Cloudflareへログイン済みであれば、公開URL(`*.workers.dev`)が表示される。

本番公開後は `doc/Cloudflareデプロイ後_変更点チェックリスト.md` に従い、
`pages/index.html` のWorkerベースURL初期値と `worker/src/index.js` のCORS許可オリジンを更新すること。
