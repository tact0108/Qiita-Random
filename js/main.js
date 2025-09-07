document.addEventListener("DOMContentLoaded", () => {
    // Qiitaの記事をランダムに取得する
    async function fetchRandomPost() {
        try {
            // ランダムなページ番号を生成
            const page = Math.floor(Math.random() * 100) + 1;

            const res = await fetch(`https://qiita.com/api/v2/items?page=${page}&per_page=20`, {
                headers: {
                    'Authorization': 'Bearer 520ac7b0c45d5dbff6b9e7f56dd1cba3e5f3036b'
                }
            });
            const posts = await res.json();

            renderPost(posts);
        } catch (err) {
            console.error(err);
        }
    }

    // 日付を年月日形式にする
    function formatDate(isoString) {
        const date = new Date(isoString);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}年${m}月${d}日`;
    }

    // 記事を表示する
    function renderPost(posts) {
        const main = document.querySelector("main");
        if (!main) return;

        const html = posts.map(post => {
            const tagNames = post.tags.map(tag => `<li>${tag.name}</li>`).join(" ");
            return `
                <article class="post">
                    <header>
                        <img src="${post.user.profile_image_url}" alt="プロフィール画像">
                        <div class="post-meta">
                            <p>@${post.user.id}</p>
                            <span>${formatDate(post.created_at)}</span>
                        </div>
                    </header>
                    <h2><a href="${post.url}" target="_blank">${post.title}</a></h2>
                    <footer>
                        <ul>${tagNames}</ul>
                        <div class="iine">
                            <i class="fa-regular fa-heart"></i>
                            <span>${post.likes_count}</span>
                        </div>
                    </footer>
                </article>
            `;
        }).join("");

        main.innerHTML = html;
    }

    fetchRandomPost();

    const btn = document.getElementById("btn");

    btn.addEventListener("click", () => {
        fetchRandomPost();
    });
});
