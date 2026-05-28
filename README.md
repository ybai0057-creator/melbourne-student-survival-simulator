# 澳大利亚墨尔本留学生生存模拟器

一个可以直接部署到 GitHub Pages 的中文互动网页小游戏。玩家扮演在澳大利亚墨尔本读书的留学生，在一周内面对 lecture、天气、group assignment、预算、city 邀约和 deadline，平衡学习值、体力值、预算值、心情值、社交值和压力值，最后获得专属结局。

## 游戏玩法

1. 打开 `index.html`。
2. 输入玩家名字。如果不输入，默认名字为“留学生”。
3. 选择一个角色类型：
   - HD 冲刺型
   - 社交达人型
   - 精致贫穷型
   - 截止日前夜战神型
4. 每天阅读事件剧情，并从 3 个选项中选择一个。
5. 每个选择都会改变属性。
6. 7 天结束后，系统根据最终属性自动生成结局和中文分享文案。

## 文件结构

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## 本地运行方法

这个项目不需要安装依赖，也不需要 build。

方法一：直接双击 `index.html`，用浏览器打开。

方法二：使用任意静态服务器打开项目目录，例如 VS Code 的 Live Server。

## GitHub Pages 部署步骤

1. 创建一个 GitHub repository。
2. 将 `index.html`、`style.css`、`script.js`、`README.md` 上传到仓库根目录。
3. 打开 GitHub 仓库的 `Settings`。
4. 进入 `Pages`。
5. `Source` 选择 `Deploy from a branch`。
6. `Branch` 选择 `main`。
7. `Folder` 选择 `/root`。
8. 点击保存。
9. 等待 GitHub Pages 构建完成后，GitHub 会生成一个公开网页链接。
10. 任何人都可以通过该链接在手机或电脑浏览器中打开游玩。

## 如何修改游戏事件和结局

主要游戏数据都在 `script.js` 中，方便以后修改。

- `baseStats`：修改初始属性。
- `roles`：修改角色类型和角色初始加成。
- `events`：修改 7 天事件、选项、结果文案和属性影响。
- `endings`：修改结局名称、判断条件、评分和描述。

属性 key 对应关系：

```js
study  // 学习值
energy // 体力值
budget // 预算值
mood   // 心情值
social // 社交值
stress // 压力值
```

属性会自动限制在 0 到 100 之间。

## 技术栈

- HTML
- CSS
- JavaScript
- localStorage

项目为纯静态网页，不使用 Node.js、React、Vite、后端服务器或数据库。

## 注意事项

- 所有游戏界面文案均为中文。
- 页面适配手机和电脑浏览器。
- 复制结果功能依赖浏览器 Clipboard API；如果浏览器不支持，会显示手动复制提示。
- 最近一次结局会保存在当前浏览器的 localStorage 中，并显示在首页。
- 部署到 GitHub Pages 时，请确保四个文件位于仓库根目录。
