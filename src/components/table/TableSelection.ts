import { Dom } from "../../core/dom";

export class TableSelection {
    group: Dom[] = [];
    current: Dom = null;
    readonly selectedClass = "selected";

    
    private clear() {
        this.group.forEach($el => $el.removeClass(this.selectedClass));
        this.group = [];
    }

    select($el: Dom) {
        this.clear();
        
        this.group.push($el);
        this.current = $el;
        $el.focus().addClass(this.selectedClass);
    }

    selectGroup($group: Dom[] = []) {
        this.clear();
        this.group = $group;
        $group.forEach($el => $el.addClass(this.selectedClass));
    }
}