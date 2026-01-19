-- CreateIndex
CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");

-- CreateIndex
CREATE INDEX "Bookmark_userId_createdAt_idx" ON "Bookmark"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Bookmark_title_idx" ON "Bookmark"("title");

-- CreateIndex
CREATE INDEX "Bookmark_url_idx" ON "Bookmark"("url");

-- CreateIndex
CREATE INDEX "Bookmark_description_idx" ON "Bookmark"("description");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_userId_idx" ON "Tag"("userId");
