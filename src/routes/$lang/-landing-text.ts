// Landing copy, one block per locale. Claims here are lifted from the docs;
// when a doc changes what tessera does, check this too. Screenshots are of the
// real app (public/landing/<locale>/), so the alt texts describe what is in them.
const en = {
  hero: {
    title: "Self-hosted file sharing",
    lead: "Upload a file and get a link and a QR code. Whoever you give them to can download the file until the share expires or its downloads run out. It runs as one Docker container on your own machine.",
    copy: "Copy command",
    copied: "Copied",
    shotResult:
      "The result after uploading: the link, QR code and share settings",
    shotPhone: "The share page on a phone",
    shotCard: "The link preview the server draws",
    terminal: {
      caption: "First start",
      done: "Open http://localhost:12923 and sign in as admin with the password above.",
      replay: "Replay",
    },
  },
  flow: {
    title: "How a share works",
    steps: [
      {
        title: "Upload",
        body: "Drop files or a folder on the page. You can also paste code or shorten a link.",
        shot: "The upload page",
      },
      {
        title: "Hand it over",
        body: "You get a link and a QR code. The eight characters at the end of the link are the retrieval code, short enough to read out. Set the expiry, burn after reading or a password right there, and change them later.",
        shot: "The result after uploading: QR code, link and share settings",
      },
      {
        title: "Download",
        body: "The recipient opens the link, or types the code on the front page. Once the share expires or runs out, the link says so and the file is deleted.",
        shot: "The share page the recipient sees",
      },
    ],
  },
  features: {
    title: "Also included",
    previews: {
      name: "Link previews",
      description:
        "Paste a link into a chat and the server draws a card for it. Opening the preview doesn’t use up a download, and a password-protected share shows only that it is locked.",
      cards: [
        "A file share’s preview",
        "A password-protected share’s preview",
        "A text share’s preview",
      ],
    },
    codes: {
      name: "Codes you can read out",
      description:
        "Case, spaces and hyphens don’t matter. O, I and L are read as 0, 1 and 1.",
    },
    items: [
      {
        name: "Password protection",
        description:
          "Until the password is entered, nobody sees the file name or size.",
      },
      {
        name: "Resumable uploads",
        description:
          "If the connection drops, the upload continues from where it stopped.",
      },
      {
        name: "End-to-end encryption",
        description:
          "Optional. Files are encrypted before they leave your machine, and the server never has the key.",
      },
      {
        name: "Virus scanning",
        description:
          "Optional. Uploads go to ClamAV or your own scanner before anyone can download them.",
      },
    ],
  },
  admin: {
    title: "An admin panel for the whole instance",
    lead: "See how much is stored and where, manage accounts, invite codes and roles, and change settings without a restart.",
    shot: "The admin dashboard",
    link: "Administration guide",
  },
  setups: {
    title: "Where files are stored",
    lead: "Start with a folder on disk. Add buckets when you need them; files already stored stay where they are.",
    pick: "Storage guide",
    tiers: [
      {
        name: "A folder on disk",
        tagline: "The default. Nothing to set up.",
        when: "Default",
        points: [
          "Files go to /data/blobs, inside the volume you mount",
          "Text shares are kept in the database",
          "Back up the volume and you have everything",
        ],
      },
      {
        name: "Buckets",
        tagline: "When the disk is small, or a bucket is cheaper.",
        when: "Added in the admin panel",
        points: [
          "S3-compatible stores, Azure Blob and Google Cloud Storage",
          "WebDAV for small files only",
          "A size limit for each, and read-only before you retire one",
        ],
      },
      {
        name: "Split across buckets",
        tagline: "For a file larger than any single bucket.",
        when: "Off by default",
        points: [
          "Five free 10 GB buckets can hold a 40 GB file",
          "Only a file that fits nowhere whole is split",
          "Split files are downloaded through the server, which uses bandwidth on both sides",
        ],
      },
    ],
  },
  api: {
    title: "REST API",
    lead: "The upload page and the admin panel use the same API you can call. Every endpoint is in the API reference.",
  },
  closing: {
    title: "Run it",
    lead: "Three steps on any machine with Docker.",
    next: "Next",
    steps: [
      {
        title: "Start it",
        body: "One container, with a volume on /data so nothing is lost when the container is recreated.",
      },
      {
        title: "Find the password",
        body: "The first start prints a generated admin password in the log, once.",
      },
      {
        title: "Sign in",
        body: "Open port 12923, sign in as admin and choose a new password. Everything else is set in the admin panel.",
      },
    ],
  },
  getStarted: "Get started",
  apiReference: "API reference",
  docs: "Documentation",
  footer: {
    language: "Language",
    tagline: "Self-hosted file sharing.",
    groups: {
      start: "Get started",
      reference: "Reference",
    },
    links: {
      start: "Run it",
      shares: "Shares",
      storage: "Storage",
      proxy: "Reverse proxy",
      configuration: "Configuration",
      api: "API",
      data: "Your data",
    },
  },
};

export type LandingText = typeof en;

const ja: LandingText = {
  hero: {
    title: "セルフホストのファイル共有",
    lead: "ファイルをアップロードすると、リンクと QR コードがもらえます。渡された人は、共有の期限が切れるかダウンロード回数がなくなるまで受け取れます。自分のマシンで Docker コンテナを一つ動かすだけです。",
    copy: "コマンドをコピー",
    copied: "コピーしました",
    shotResult: "アップロード後の画面:リンク、QR コード、共有の設定",
    shotPhone: "スマートフォンで見た共有ページ",
    shotCard: "サーバーが描くリンクプレビュー",
    terminal: {
      caption: "初回起動",
      done: "http://localhost:12923 を開き、上のパスワードで admin としてサインインします。",
      replay: "もう一度",
    },
  },
  flow: {
    title: "共有の流れ",
    steps: [
      {
        title: "アップロード",
        body: "ファイルやフォルダを画面に入れます。コードの貼り付けや、リンクの短縮もできます。",
        shot: "アップロード画面",
      },
      {
        title: "渡す",
        body: "リンクと QR コードが出ます。リンクの最後の 8 文字が受け取りコードで、読み上げられる短さです。有効期限、読んだら削除、パスワードはその場で設定でき、あとからも変えられます。",
        shot: "アップロード後の画面。QR コード、リンク、共有の設定",
      },
      {
        title: "受け取る",
        body: "相手はリンクを開くか、トップページでコードを入力します。期限切れや回数切れになると、リンクはそう表示し、ファイルは削除されます。",
        shot: "受け取る側に表示される共有ページ",
      },
    ],
  },
  features: {
    title: "ほかにも",
    previews: {
      name: "リンクプレビュー",
      description:
        "チャットにリンクを貼ると、サーバーが描いたカードが出ます。プレビューを開いてもダウンロード回数は減らず、パスワード付きの共有はロックされていることしか見せません。",
      cards: [
        "ファイル共有のプレビュー",
        "パスワード付き共有のプレビュー",
        "テキスト共有のプレビュー",
      ],
    },
    codes: {
      name: "読み上げやすいコード",
      description:
        "大文字小文字、スペース、ハイフンは無視します。O、I、L は 0、1、1 として読みます。",
    },
    items: [
      {
        name: "パスワード",
        description: "パスワードを入れるまで、ファイル名もサイズも見えません。",
      },
      {
        name: "アップロードの再開",
        description: "接続が切れても、止まったところから続きを送ります。",
      },
      {
        name: "エンドツーエンド暗号化",
        description:
          "任意。ファイルは手元で暗号化してから送られ、サーバーは鍵を持ちません。",
      },
      {
        name: "ウイルススキャン",
        description:
          "任意。誰かがダウンロードする前に、ClamAV や自前のスキャナーで確認します。",
      },
    ],
  },
  admin: {
    title: "インスタンス全体の管理画面",
    lead: "保存量と保存先を確認し、アカウント、招待コード、ロールを管理し、再起動なしで設定を変えられます。",
    shot: "管理画面のダッシュボード",
    link: "管理のガイド",
  },
  setups: {
    title: "ファイルの保存先",
    lead: "ディスク上のフォルダから始めて、必要になったらバケットを追加します。保存済みのファイルはそのままです。",
    pick: "ストレージのガイド",
    tiers: [
      {
        name: "ディスク上のフォルダ",
        tagline: "デフォルト。設定は不要です。",
        when: "デフォルト",
        points: [
          "ファイルはマウントしたボリューム内の /data/blobs に入ります",
          "テキスト共有はデータベースに入ります",
          "ボリュームをバックアップすればすべて残ります",
        ],
      },
      {
        name: "バケット",
        tagline: "ディスクが小さいとき、バケットのほうが安いとき。",
        when: "管理画面から追加",
        points: [
          "S3 互換ストレージ、Azure Blob、Google Cloud Storage",
          "WebDAV は小さなファイル専用",
          "それぞれに容量上限。引退させる前に読み取り専用に",
        ],
      },
      {
        name: "バケットをまたいで分割",
        tagline: "どのバケットよりも大きなファイルに。",
        when: "デフォルトはオフ",
        points: [
          "無料の 10 GB バケット 5 つで 40 GB のファイルが入ります",
          "どこにも丸ごと入らないファイルだけを分割します",
          "分割したファイルはサーバー経由でダウンロードするので、帯域を両側で使います",
        ],
      },
    ],
  },
  api: {
    title: "REST API",
    lead: "アップロード画面も管理画面も、あなたが呼べるのと同じ API を使っています。すべてのエンドポイントは API リファレンスにあります。",
  },
  closing: {
    title: "動かす",
    lead: "Docker が動くマシンなら三ステップです。",
    next: "次に読む",
    steps: [
      {
        title: "起動する",
        body: "コンテナを一つ。/data にボリュームをマウントすれば、作り直してもデータは残ります。",
      },
      {
        title: "パスワードを探す",
        body: "初回起動時に、生成された管理者パスワードがログに一度だけ出ます。",
      },
      {
        title: "サインインする",
        body: "12923 番ポートを開き、admin でサインインして新しいパスワードを決めます。ほかの設定は管理画面で行います。",
      },
    ],
  },
  getStarted: "はじめる",
  apiReference: "API リファレンス",
  docs: "ドキュメント",
  footer: {
    language: "言語",
    tagline: "セルフホストのファイル共有。",
    groups: {
      start: "はじめる",
      reference: "リファレンス",
    },
    links: {
      start: "動かす",
      shares: "共有",
      storage: "ストレージ",
      proxy: "リバースプロキシ",
      configuration: "設定",
      api: "API",
      data: "あなたのデータ",
    },
  },
};

const zhTW: LandingText = {
  hero: {
    title: "自架的檔案分享服務",
    lead: "上傳檔案,拿到連結和 QR code,交給對方。對方在分享過期或下載次數用完之前都能取件。整個服務是一個 Docker 容器,跑在你自己的機器上。",
    copy: "複製指令",
    copied: "已複製",
    shotResult: "上傳後的畫面:連結、QR code 和分享設定",
    shotPhone: "手機上看到的分享頁",
    shotCard: "伺服器畫的連結預覽",
    terminal: {
      caption: "第一次啟動",
      done: "打開 http://localhost:12923,用上面的密碼以 admin 登入。",
      replay: "重播",
    },
  },
  flow: {
    title: "分享怎麼運作",
    steps: [
      {
        title: "上傳",
        body: "把檔案或資料夾丟到頁面上。也可以貼一段程式碼,或縮短一個連結。",
        shot: "上傳頁",
      },
      {
        title: "交給對方",
        body: "上傳完會拿到連結和 QR code。連結最後的 8 個字就是取件碼,短到念得出來。過期時間、下載即焚和密碼當場就能設,之後也能改。",
        shot: "上傳完成的畫面:QR code、連結和分享設定",
      },
      {
        title: "取件",
        body: "對方打開連結,或在首頁輸入取件碼。分享過期或次數用完後,連結會顯示已失效,檔案也會刪掉。",
        shot: "對方看到的分享頁",
      },
    ],
  },
  features: {
    title: "其他功能",
    previews: {
      name: "連結預覽",
      description:
        "連結貼到聊天軟體,會出現伺服器畫的預覽卡。打開預覽不會用掉下載次數,上了密碼的分享只會顯示它上了鎖。",
      cards: ["檔案分享的預覽", "上了密碼的分享的預覽", "文字分享的預覽"],
    },
    codes: {
      name: "好念的取件碼",
      description: "不分大小寫,空格和連字號都不影響。O、I、L 會當成 0、1、1。",
    },
    items: [
      {
        name: "密碼保護",
        description: "輸入密碼之前,看不到檔名和大小。",
      },
      {
        name: "斷線續傳",
        description: "連線斷掉的話,上傳會從中斷的地方接著傳。",
      },
      {
        name: "端對端加密",
        description: "選用。檔案在你的機器上加密後才送出,伺服器拿不到金鑰。",
      },
      {
        name: "掃毒",
        description:
          "選用。上傳的檔案先交給 ClamAV 或你自己的掃描服務,掃完才能下載。",
      },
    ],
  },
  admin: {
    title: "整台的管理後台",
    lead: "看存了多少、存在哪裡,管理帳號、邀請碼和角色,改設定不用重啟。",
    shot: "管理後台的儀表板",
    link: "管理說明",
  },
  setups: {
    title: "檔案存在哪裡",
    lead: "先用磁碟上的資料夾,需要時再加 bucket。已經存好的檔案不會搬動。",
    pick: "儲存設定說明",
    tiers: [
      {
        name: "磁碟上的資料夾",
        tagline: "預設,不用設定。",
        when: "預設",
        points: [
          "檔案放在你掛上的 volume 裡的 /data/blobs",
          "文字分享存在資料庫裡",
          "備份這個 volume 就全部都在",
        ],
      },
      {
        name: "Bucket",
        tagline: "磁碟小,或 bucket 比較便宜的時候。",
        when: "從管理後台新增",
        points: [
          "S3 相容儲存、Azure Blob、Google Cloud Storage",
          "WebDAV 只適合小檔案",
          "每個可以設容量上限,要汰換前先設成唯讀",
        ],
      },
      {
        name: "跨 bucket 分塊",
        tagline: "給比任何一個 bucket 都大的檔案。",
        when: "預設關閉",
        points: [
          "五個免費的 10 GB bucket 能放下一個 40 GB 的檔案",
          "只有哪裡都放不下整個的檔案才會被切開",
          "分塊的檔案下載時經過伺服器,兩邊都會用到流量",
        ],
      },
    ],
  },
  api: {
    title: "REST API",
    lead: "上傳頁和管理後台用的就是你也能呼叫的同一套 API。所有端點都在 API 參考裡。",
  },
  closing: {
    title: "跑起來",
    lead: "有 Docker 的機器,三步就好。",
    next: "接下來",
    steps: [
      {
        title: "啟動",
        body: "一個容器,/data 掛上 volume,重建容器資料也不會不見。",
      },
      {
        title: "找密碼",
        body: "第一次啟動會在 log 印出產生的管理員密碼,只印這一次。",
      },
      {
        title: "登入",
        body: "打開 12923 port,用 admin 登入並設新密碼。其他設定都在管理後台。",
      },
    ],
  },
  getStarted: "開始使用",
  apiReference: "API 參考",
  docs: "文件",
  footer: {
    language: "語言",
    tagline: "自架的檔案分享服務。",
    groups: {
      start: "開始",
      reference: "參考",
    },
    links: {
      start: "跑起來",
      shares: "分享",
      storage: "儲存",
      proxy: "反向代理",
      configuration: "設定",
      api: "API",
      data: "你的資料",
    },
  },
};

const zhCN: LandingText = {
  hero: {
    title: "自托管的文件分享服务",
    lead: "上传文件,拿到链接和二维码,交给对方。对方在分享过期或下载次数用完之前都能取件。整个服务是一个 Docker 容器,跑在你自己的机器上。",
    copy: "复制命令",
    copied: "已复制",
    shotResult: "上传后的画面:链接、二维码和分享设置",
    shotPhone: "手机上看到的分享页",
    shotCard: "服务器画的链接预览",
    terminal: {
      caption: "第一次启动",
      done: "打开 http://localhost:12923,用上面的密码以 admin 登录。",
      replay: "重播",
    },
  },
  flow: {
    title: "分享怎么运作",
    steps: [
      {
        title: "上传",
        body: "把文件或文件夹拖到页面上。也可以贴一段代码,或缩短一个链接。",
        shot: "上传页",
      },
      {
        title: "交给对方",
        body: "上传完会拿到链接和二维码。链接最后的 8 个字符就是取件码,短到念得出来。过期时间、阅后即焚和密码当场就能设,之后也能改。",
        shot: "上传完成的画面:二维码、链接和分享设置",
      },
      {
        title: "取件",
        body: "对方打开链接,或在首页输入取件码。分享过期或次数用完后,链接会显示已失效,文件也会删掉。",
        shot: "对方看到的分享页",
      },
    ],
  },
  features: {
    title: "其他功能",
    previews: {
      name: "链接预览",
      description:
        "链接贴到聊天软件,会出现服务器画的预览卡。打开预览不会用掉下载次数,加了密码的分享只会显示它上了锁。",
      cards: ["文件分享的预览", "加了密码的分享的预览", "文字分享的预览"],
    },
    codes: {
      name: "好念的取件码",
      description: "不分大小写,空格和连字符都不影响。O、I、L 会当成 0、1、1。",
    },
    items: [
      {
        name: "密码保护",
        description: "输入密码之前,看不到文件名和大小。",
      },
      {
        name: "断点续传",
        description: "连接断掉的话,上传会从中断的地方接着传。",
      },
      {
        name: "端到端加密",
        description: "可选。文件在你的机器上加密后才发出,服务器拿不到密钥。",
      },
      {
        name: "病毒扫描",
        description:
          "可选。上传的文件先交给 ClamAV 或你自己的扫描服务,扫完才能下载。",
      },
    ],
  },
  admin: {
    title: "整台的管理后台",
    lead: "看存了多少、存在哪里,管理账号、邀请码和角色,改配置不用重启。",
    shot: "管理后台的仪表盘",
    link: "管理说明",
  },
  setups: {
    title: "文件存在哪里",
    lead: "先用磁盘上的文件夹,需要时再加 bucket。已经存好的文件不会搬动。",
    pick: "存储配置说明",
    tiers: [
      {
        name: "磁盘上的文件夹",
        tagline: "默认,不用配置。",
        when: "默认",
        points: [
          "文件放在你挂载的 volume 里的 /data/blobs",
          "文字分享存在数据库里",
          "备份这个 volume 就全部都在",
        ],
      },
      {
        name: "Bucket",
        tagline: "磁盘小,或 bucket 比较便宜的时候。",
        when: "从管理后台添加",
        points: [
          "S3 兼容存储、Azure Blob、Google Cloud Storage",
          "WebDAV 只适合小文件",
          "每个可以设容量上限,要替换前先设成只读",
        ],
      },
      {
        name: "跨 bucket 分块",
        tagline: "给比任何一个 bucket 都大的文件。",
        when: "默认关闭",
        points: [
          "五个免费的 10 GB bucket 能放下一个 40 GB 的文件",
          "只有哪里都放不下整个的文件才会被切开",
          "分块的文件下载时经过服务器,两边都会用到流量",
        ],
      },
    ],
  },
  api: {
    title: "REST API",
    lead: "上传页和管理后台用的就是你也能调用的同一套 API。所有接口都在 API 参考里。",
  },
  closing: {
    title: "跑起来",
    lead: "有 Docker 的机器,三步就好。",
    next: "接下来",
    steps: [
      {
        title: "启动",
        body: "一个容器,/data 挂上 volume,重建容器数据也不会丢。",
      },
      {
        title: "找密码",
        body: "第一次启动会在日志打印生成的管理员密码,只打印这一次。",
      },
      {
        title: "登录",
        body: "打开 12923 端口,用 admin 登录并设新密码。其他配置都在管理后台。",
      },
    ],
  },
  getStarted: "开始使用",
  apiReference: "API 参考",
  docs: "文档",
  footer: {
    language: "语言",
    tagline: "自托管的文件分享服务。",
    groups: {
      start: "开始",
      reference: "参考",
    },
    links: {
      start: "跑起来",
      shares: "分享",
      storage: "存储",
      proxy: "反向代理",
      configuration: "配置",
      api: "API",
      data: "你的数据",
    },
  },
};

const landingText: Record<string, LandingText> = {
  en,
  ja,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
};

/** Which screenshot set a locale uses. Every locale has its own now. */
export const shotLocale: Record<string, string> = {
  en: "en",
  ja: "ja",
  "zh-TW": "zh-TW",
  "zh-CN": "zh-CN",
};

export function getLandingText(lang: string): LandingText {
  return landingText[lang] ?? en;
}
