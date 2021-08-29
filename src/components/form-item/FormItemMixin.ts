import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

enum Events {
    /** emit event UPDATE_VALUE when form item value is changed. */
    UPDATE_VALUE = 'update:value'
}

@Component
export default class FormItemMixin extends Vue {
    @Prop() 'value': any;
    @Prop() 'propName': string;
    @Prop() 'placeholder': string;
    @Prop() 'title': string;
    @Prop() 'note': string;
    @Prop({default: false}) 'disabled': boolean;

    protected formItemValue: any;

    constructor() {
        super();
        this.formItemValue = this.value;
    }

    @Watch('value')
    private valueChanged(val: any): void {
        this.formItemValue = val;
    }

    @Watch('formItemValue')
    private formItemValueChanged(val: any): void {
        this.$emit(Events.UPDATE_VALUE, val);
    }
}
