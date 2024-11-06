$(document).ready(function () {
    const forbiddenTitle = "Cara Mengatasi Hama Padi tanpa Pestisida"; 

    function saveDiscussionsToLocalStorage() {
        const discussions = $('#discussion-list .topic-card').map(function () {
            const title = $(this).find('.topic-title').text();
            const content = $(this).find('.full-content').text();
            const commentCountText = $(this).find('.comments span').text();
            const commentCount = parseInt(commentCountText.split(' ')[0]) || 0; 
            return { title, content, commentCount };
        }).get();
        localStorage.setItem('discussions', JSON.stringify(discussions));
    }

    function loadDiscussionsFromLocalStorage() {
        const discussions = JSON.parse(localStorage.getItem('discussions')) || [];
        
        discussions.reverse().forEach(discussion => {
            if (discussion.title !== forbiddenTitle) { 
                const displayContent = discussion.content.length > 100 
                    ? discussion.content.substring(0, 100) + '...' 
                    : discussion.content;

                const newDiscussion = `
                <div class="card topic-card" data-category="terbaru">
                    <img src="/assets/images/ppPetanijpg.jpg" alt="Foto Topik Diskusi" class="topic-image">
                    <div class="topic-info">
                        <div class="topic-header" style="position: relative;">
                            <h5 class="topic-title">${discussion.title}</h5>
                            <div class="edit-discussion" style="cursor: pointer; position: absolute; right: 30px;">
                                <i class="bi bi-pencil-square"></i>
                            </div>
                            <div class="delete-discussion" style="cursor: pointer; position: absolute; right: 5px;">
                                <i class="bi bi-three-dots-vertical"></i>
                            </div>
                        </div>
                        <p class="discussion-content">${displayContent}</p>
                        <div class="full-content" style="display: none;">${discussion.content}</div>
                        <div class="comments" style="cursor: pointer;">
                            <i class="far fa-comment"></i>
                            <span>${discussion.commentCount} Komentar</span> <!-- Display the comment count -->
                        </div>
                        <div class="comment-section" style="display: none;">
                            <div class="comment-list"></div>
                            <div class="new-comment-card">
                                <div class="input-container">
                                    <input type="text" class="new-comment" placeholder="Tulis komentar...">
                                    <button class="send-button add-comment"><i class="bi bi-send"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                $('#discussion-list').prepend(newDiscussion); 
            }
        });
        updateCategoryCounts(); 
    }

    function updateCategoryCounts() {
        const discussions = JSON.parse(localStorage.getItem('discussions')) || [];
        let semuaCount = discussions.length; 
        let terbaruCount = discussions.filter(d => d.title.toLowerCase().includes('terbaru')).length; 
        let hangatCount = discussions.filter(d => d.title.toLowerCase().includes('hangat')).length; 

        $('.total-count').text(semuaCount);
        $('.terbaru-count').text(terbaruCount);
        $('.hangat-count').text(hangatCount);
    }

    loadDiscussionsFromLocalStorage();

    $('#add-discussion').click(() => {
        $('#discussion-modal').css("display", "flex");
        $('#discussion-title, #discussion-content').val(''); 
        $('#discussion-modal').data('edit', false);
    });

    function closeModal() {
        $('#discussion-modal').hide();
    }

    $('.close-modal, #discussion-modal').click(function (event) {
        if ($(event.target).is('#discussion-modal') || $(event.target).is('.close-modal')) {
            closeModal();
        }
    });

    $('#submit-discussion').click(function (event) {
        event.preventDefault(); 
        const title = $('#discussion-title').val().trim();
        const content = $('#discussion-content').val().trim();

        if (title && content) {
            if (title === forbiddenTitle) {
                alert(`Diskusi dengan judul "${forbiddenTitle}" tidak dapat dibuat.`);
                return; 
            }

            if ($('#discussion-modal').data('edit')) { 
                const topicCard = $('#discussion-modal').data('topicCard');
                topicCard.find('.topic-title').text(title);
                topicCard.find('.full-content').html(content);
                const displayContent = content.length > 100 
                    ? content.substring(0, 100) + '...' 
                    : content;
                topicCard.find('.discussion-content').html(displayContent);
            } else {
                const displayContent = content.length > 100 
                    ? content.substring(0, 100) + '...' 
                    : content;

                    const newDiscussion = `
                    <div class="card topic-card" data-category="terbaru">
                        <img src="/assets/images/ppPetanijpg.jpg" alt="Foto Topik Diskusi" class="topic-image">
                        <div class="topic-info">
                            <div class="topic-header" style="position: relative;">
                                <h5 class="topic-title">${title}</h5>
                                <div class="edit-discussion" style="cursor: pointer; position: absolute; right: 30px;">
                                    <i class="bi bi-pencil-square"></i>
                                </div>
                                <div class="delete-discussion" style="cursor: pointer; position: absolute; right: 5px;">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </div>
                            </div>
                            <p class="discussion-content">${displayContent}</p>
                            <div class="full-content" style="display: none;">${content}</div>
                            <div class="comments" style="cursor: pointer;">
                                <i class="bi bi-chat-dots"></i>

                                <span>0 Komentar</span>
                            </div>
                            <div class="comment-section" style="display: none;">
                                <div class="comment-list"></div>
                                <div class="new-comment-card">
                                    <div class="input-container">
                                        <input type="text" class="new-comment" placeholder="Tulis komentar...">
                                        <button class="send-button add-comment"><i class="bi bi-send"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    

                $('#discussion-list').prepend(newDiscussion);
            }

            saveDiscussionsToLocalStorage(); 
            updateCategoryCounts();
            closeModal();
        } else {
            alert("Harap masukkan judul topik dan deskripsi.");
        }
    });

    $('#discussion-content').on('input', function () {
        this.style.height = 'auto'; 
        this.style.height = (this.scrollHeight) + 'px'; 
    });

    $(document).on('click', '.comments', function () {
        const commentSection = $(this).siblings('.comment-section');
        const topicCard = $(this).closest('.topic-card');
        const topicTitle = topicCard.find('.topic-title').text();

        if (!commentSection.children('.comment-list').children().length) {
            const comments = JSON.parse(localStorage.getItem(topicTitle)) || [];
            comments.forEach(comment => {
                const newComment = `
                <div class="comment-card">
                    <img src="/assets/images/ppPetanijpg.jpg" alt="Foto Pengguna" class="comment-profile">
                    <div class="comment-content">
                        <div class="comment-name">Anda</div>
                        <p>${comment}</p>
                    </div>
                </div>`;
                commentSection.find('.comment-list').append(newComment);
            });
        }

        commentSection.toggle(); 
        const fullContent = $(this).siblings('.full-content').html();
        $(this).siblings('.discussion-content').html(fullContent); 
        const topicImage = $(this).closest('.topic-card').find('.topic-image');
        topicImage.toggle(!commentSection.is(':visible'));
    });

    $(document).on('click', '.add-comment', function () {
        const topicCard = $(this).closest('.topic-card');
        const commentSection = topicCard.find('.comment-section');
        const topicTitle = topicCard.find('.topic-title').text();
        const newCommentText = $(this).siblings('.new-comment').val().trim();

        if (newCommentText) {
            const newComment = `
            <div class="comment-card">
                <img src="/assets/images/ppPetanijpg.jpg" alt="Foto Pengguna" class="comment-profile">
                <div class="comment-content">
                    <div class="comment-name">Anda</div>
                    <p>${newCommentText}</p>
                </div>
            </div>`;

            commentSection.find('.comment-list').prepend(newComment);
            $(this).siblings('.new-comment').val('');

            let comments = JSON.parse(localStorage.getItem(topicTitle)) || [];
            comments.push(newCommentText);
            localStorage.setItem(topicTitle, JSON.stringify(comments));

            const commentCount = commentSection.find('.comment-list .comment-card').length;
            topicCard.find('.comments span').text(`${commentCount} Komentar`);

            saveDiscussionsToLocalStorage(); 
        }
    });

    $(document).on('click', '.delete-discussion', function () {
        const topicCard = $(this).closest('.topic-card');
        const title = topicCard.find('.topic-title').text();
    
        // Menggunakan SweetAlert2 untuk konfirmasi penghapusan
        Swal.fire({
            title: `Apakah Anda yakin ingin menghapus diskusi "${title}"?`,
            text: "Diskusi yang dihapus tidak dapat dikembalikan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Jika pengguna mengkonfirmasi, hapus diskusi
                topicCard.remove();
                saveDiscussionsToLocalStorage();
                updateCategoryCounts();
                Swal.fire(
                    'Dihapus!',
                    'Diskusi berhasil dihapus.',
                    'success'
                );
            }
        });
    });
    

    $(document).on('click', '.edit-discussion', function () {
        const topicCard = $(this).closest('.topic-card');
        const title = topicCard.find('.topic-title').text();
        const content = topicCard.find('.full-content').html();

        $('#discussion-title').val(title);
        $('#discussion-content').val(content);

        $('#discussion-modal').data('edit', true);
        $('#discussion-modal').data('topicCard', topicCard);

        $('#discussion-modal').css("display", "flex");
    });
});
