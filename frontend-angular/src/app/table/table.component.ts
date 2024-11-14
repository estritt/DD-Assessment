import { Component, Directive, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";

// interface Image {
//     // note this does not yet allow null values
//     image_id: number;
//     timestamp: string; // use timestamp?
//     latitude: string;
//     altitude: number;
//     heading_deg: number;
//     file_name: string;
//     camera_tilt_deg: number; 
//     focal_length_mm: number;
//     iso: number;
//     shutter_speed: string;
//     aperture: string;
//     color_temp_k: number;
//     image_format: string;
//     file_size_mb: number; etc
// }

export type SortColumn = number | string | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {asc: 'desc', desc: '', '': 'asc'};

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}
@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}

@Component({
    selector: 'table-component',
    templateUrl: './table.component.html',
    imports: [CommonModule, NgbdSortableHeader],
    standalone: true
})
export class TableComponent implements OnInit{
    DATA: any; 
    data: any; //for sorting
    isLoading: boolean; // tsconfig.json has strictPropertyInitialization = false for this
    columnOrder = [
        'image_id', 'timestamp', 'latitude', 'longitude', 'altitude_m', 'heading_deg', 'file_name', 
        'camera_tilt_deg', 'focal_length_mm', 'iso', 'shutter_speed', 'aperture', 'color_temp_k', 
        'image_format', 'file_size_mb', 'drone_speed_mps', 'battery_level_pct', 'gps_accuracy_m', 
        'gimbal_mode', 'subject_detection', 'image_tags'
    ]

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    onSort({ column, direction }: SortEvent) {
		// resetting other headers
		for (const header of this.headers) {
			if (header.sortable !== column) {
				header.direction = '';
			}
		}

		if (direction === '' || column === '') {
			this.data = this.DATA;
		} else {
			this.data = [...this.DATA].sort((a, b) => {
				const res = compare(a[column], b[column]);
				return direction === 'asc' ? res : -res;
			});
		}
	}

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.isLoading = true;
        this.http.get('http://localhost:5000/data')
        // .pipe(
        //     Map(response => response.data),

        // )
        .subscribe(response => { // subscribe parses json automatically
            this.DATA = response;
            this.data = this.DATA;
            this.isLoading = false;
        }, error => {
            this.isLoading = false;
            console.log('Error: ', error);
        });
    }

}