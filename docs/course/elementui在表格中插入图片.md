---
lang: zh-CN
title: elementui在表格中插入图片
description: 12a
---

# elementui在表格中插入图片

## 插入单张，悬浮预览

::: warning 注意
下面`scope.row`表示当前的行对象
:::

``` html
<el-table-column  label="图片">
  <template slot-scope="scope">
    <el-popover placement="top-start" title="" trigger="hover">
      <img :src="scope.row.imagesUrl" alt="..." style="width: 150px;height: 150px">
      <img slot="reference" :src="scope.row.imagesUrl" style="width: 30px;height: 30px">
    </el-popover>
    <span>{{scope.row.title}}</span>
  </template>
</el-table-column>
```

## 插入单张，全屏预览

```html
 <el-table-column prop="imagesUrl" label="图片" width="100">
    <template slot-scope="scope">
        <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.imagesUrl"
            :preview-src-list="[scope.row.imagesUrl]">
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
    </template>
</el-table-column>
<!-- slot="error"插槽是为了图片不存在或出错时替换为图标 -->
```

## 插入多张图片

```html
<el-table-column  label="图片">
  <template slot-scope="scope">
    <el-image v-for="(item, index) in scope.row.images" :key='index' style="width: 30px; height: 30px" :src="item.imagesUrl" :preview-src-list="[item.imagesUrl]"></el-image>
  </template>
</el-table-column>
```