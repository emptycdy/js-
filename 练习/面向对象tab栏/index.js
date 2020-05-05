window.onload = function () {


    // var that;
    class Tab {
        constructor(id) {
            // that = this;
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('ul');
            this.fsection = this.main.querySelector('.tabscon');
            this.init();
        }
        //获取所有li和section
        updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.section = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon');
            this.span = this.main.querySelectorAll('.firstnav li span:first-child');
        }
        init() {
            this.updateNode();
            // init初始化让元素绑定事件
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
                this.remove[i].onclick = this.removeTab.bind(this.remove[i], this);
                this.span[i].ondblclick = this.editTab;
                this.section[i].ondblclick = this.editTab.bind(this.section[i], this.section[i]);
            }
            this.add.onclick = this.addTab.bind(this.add, this);
        }
        //切换
        toggleTab(that) {
            that.clearClass();
            this.className = 'liactive';
            that.section[this.index].className = 'conactive';
        }
        //清楚所有类
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.section[i].className = '';
            }
        }
        //添加
        addTab(that) {
            that.clearClass();
            var random = Math.random();
            var li = '<li class="liactive"><span>新选择卡</span><span class="iconfont icon-close-b icon"></span></li >';
            var section = '<section class="conactive">测试' + random + '</section>';
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        //删除
        removeTab(that, e) {
            e.stopPropagation();  //阻止冒泡
            var index = this.parentNode.index;
            that.lis[index].remove();
            that.section[index].remove();
            that.init();
            if (document.querySelector('.liactive')) return;
            index--;
            that.lis[index] && that.lis[index].click();
        }
        //修改
        editTab(that) {
            var str = this.innerHTML;
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();   //双击禁止选定文字
            this.innerHTML = '<textarea></textarea>';
            var input = this.children[0];
            input.value = str;
            input.select();
            input.onblur = function () {
                this.parentNode.innerHTML = this.value;
            }
            input.onkeyup = function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }

        }
    }
    new Tab('#tab');































}